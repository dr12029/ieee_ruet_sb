'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import EventForm from '@/components/admin/EventForm';

export default function EditEventPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setEvent(data.event);
        }
      } catch (error) {
        console.error('Failed to fetch event', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div>
      <EventForm initialData={event} isEdit={true} />
    </div>
  );
}
