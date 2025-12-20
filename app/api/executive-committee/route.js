import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ExecutiveCommittee from '@/models/ExecutiveCommittee';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { executiveMembers } from '@/data/executiveMembers';
import { hallOfFameData, getSessions, getSessionData } from '@/data/hallOfFameData';

/**
 * GET /api/executive-committee
 * Returns executive committee members with optional filtering
 * Query parameters:
 * - session: Filter by session year (e.g., 2024-25)
 * - organization: Filter by organization (e.g., IEEE RUET SB)
 * - isActive: Filter by active status (true for current, false for hall of fame)
 * - featured: Filter featured members only
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const session = searchParams.get('session');
        const organization = searchParams.get('organization');
        const isActive = searchParams.get('isActive');
        const featured = searchParams.get('featured');

        // Try MongoDB first
        if (process.env.MONGODB_URI) {
            try {
                await connectDB();
                let query = {};

                if (session) {
                    query.session = session;
                }

                if (organization) {
                    query.organization = organization;
                }

                if (isActive !== null && isActive !== undefined) {
                    query.isActive = isActive === 'true';
                }

                if (featured === 'true') {
                    query.featured_member = true;
                }

                const members = await ExecutiveCommittee.find(query)
                    .sort({ session: -1, displayOrder: 1, _id: 1 })
                    .lean();
                
                // Get available sessions from DB
                const allMembers = await ExecutiveCommittee.find({}, 'session').lean();
                const sessions = [...new Set(allMembers.map(m => m.session))].filter(Boolean).sort((a, b) => b.localeCompare(a));

                // Get organizations
                const organizations = ['IEEE RUET SB', 'IEEE RUET IAS SB Chapter', 'IEEE RUET RAS SB Chapter', 
                                      'IEEE CS RUET SB Chapter', 'IEEE RUET WIE SB AG', 'IEEE RUET SPS SB Chapter'];

                return NextResponse.json({
                    success: true,
                    count: members.length,
                    members,
                    sessions,
                    organizations
                });
            } catch (dbError) {
                console.error('MongoDB connection failed, falling back to static data:', dbError);
                // Fallback to static data below
            }
        }

        // Fallback to static data
        let members = [];
        let availableSessions = [];

        // Check if requesting current executive committee (isActive=true or no session specified with isActive=true)
        if (isActive === 'true' || (isActive === null && !session)) {
            // Return current executive members from executiveMembers.js
            const allCurrentMembers = [
                executiveMembers.counselor,
                ...executiveMembers.advisors,
                ...executiveMembers.sbExecutives,
                ...(executiveMembers.iasChapter ? [executiveMembers.iasChapter.advisor, ...executiveMembers.iasChapter.executives] : []),
                ...(executiveMembers.rasChapter ? [executiveMembers.rasChapter.advisor, ...executiveMembers.rasChapter.executives] : []),
                ...(executiveMembers.csChapter ? [executiveMembers.csChapter.advisor, ...executiveMembers.csChapter.executives] : []),
                ...(executiveMembers.wieChapter ? [executiveMembers.wieChapter.advisor, ...executiveMembers.wieChapter.executives] : []),
                ...(executiveMembers.spsChapter ? [executiveMembers.spsChapter.advisor, ...executiveMembers.spsChapter.executives] : []),
            ];

            members = allCurrentMembers.filter(m => m); // Remove any undefined

            if (organization) {
                members = members.filter(m => m.organization === organization);
            }

            if (featured === 'true') {
                members = members.filter(m => m.featured_member);
            }
        } else if (session || isActive === 'false') {
            // Return hall of fame data
            availableSessions = getSessions();
            const targetSession = session || availableSessions[0];
            const sessionData = getSessionData(targetSession);

            if (sessionData) {
                // Convert hall of fame data to member format
                const orgMapping = {
                    'sb': 'IEEE RUET SB',
                    'wie': 'IEEE RUET WIE SB AG',
                    'ias': 'IEEE RUET IAS SB Chapter',
                    'ras': 'IEEE RUET RAS SB Chapter',
                    'cs': 'IEEE CS RUET SB Chapter',
                    'sps': 'IEEE RUET SPS SB Chapter',
                };

                Object.entries(sessionData).forEach(([orgKey, orgMembers]) => {
                    orgMembers.forEach((member, index) => {
                        members.push({
                            id: `${targetSession}-${orgKey}-${member.no}`,
                            name: member.name,
                            position: member.designation,
                            organization: orgMapping[orgKey] || orgKey,
                            session: targetSession,
                            displayOrder: member.no,
                            isActive: false,
                        });
                    });
                });

                if (organization) {
                    members = members.filter(m => m.organization === organization);
                }
            }
        }

        const organizations = ['IEEE RUET SB', 'IEEE RUET IAS SB Chapter', 'IEEE RUET RAS SB Chapter', 
                              'IEEE CS RUET SB Chapter', 'IEEE RUET WIE SB AG', 'IEEE RUET SPS SB Chapter'];

        return NextResponse.json({
            success: true,
            count: members.length,
            members,
            sessions: availableSessions.length > 0 ? availableSessions : getSessions(),
            organizations
        });

    } catch (error) {
        console.error('Error fetching executive committee members:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch executive committee members',
                message: error.message 
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/executive-committee
 * Create a new executive committee member
 * Requires authentication
 */
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const data = await request.json();

        const member = await ExecutiveCommittee.create(data);

        return NextResponse.json({
            success: true,
            member
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating executive committee member:', error);
        
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Validation Error',
                    message: error.message 
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to create executive committee member',
                message: error.message 
            },
            { status: 500 }
        );
    }
}
