import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ExecutiveCommittee from '@/models/ExecutiveCommittee';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/executive-committee/[id]
 * Returns a specific executive committee member
 */
export async function GET(request, { params }) {
    try {
        const { id } = params;
        
        await connectDB();
        const member = await ExecutiveCommittee.findById(id).lean();

        if (!member) {
            return NextResponse.json(
                { success: false, error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            member
        });

    } catch (error) {
        console.error('Error fetching executive committee member:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch executive committee member',
                message: error.message 
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/executive-committee/[id]
 * Update an executive committee member
 * Requires authentication
 */
export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;
        const data = await request.json();

        await connectDB();
        const member = await ExecutiveCommittee.findByIdAndUpdate(
            id,
            data,
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!member) {
            return NextResponse.json(
                { success: false, error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            member
        });

    } catch (error) {
        console.error('Error updating executive committee member:', error);
        
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
                error: 'Failed to update executive committee member',
                message: error.message 
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/executive-committee/[id]
 * Delete an executive committee member
 * Requires authentication
 */
export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;

        await connectDB();
        const member = await ExecutiveCommittee.findByIdAndDelete(id);

        if (!member) {
            return NextResponse.json(
                { success: false, error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Member deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting executive committee member:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to delete executive committee member',
                message: error.message 
            },
            { status: 500 }
        );
    }
}
