import { supabase } from '../supabase';

export async function trackPageView(path: string) {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert({
        path,
        timestamp: new Date().toISOString()
      });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

export async function trackLabClick(labId: number) {
  try {
    const { error } = await supabase
      .from('lab_clicks')
      .insert({
        lab_id: labId,
        timestamp: new Date().toISOString()
      });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error tracking lab click:', error);
  }
}

export async function getAnalytics() {
  const { data: pageViews } = await supabase
    .from('page_views')
    .select('path, timestamp')
    .order('timestamp', { ascending: false });

  const { data: labClicks } = await supabase
    .from('lab_clicks')
    .select('lab_id, timestamp')
    .order('timestamp', { ascending: false });

  return {
    pageViews: pageViews || [],
    labClicks: labClicks || []
  };
}