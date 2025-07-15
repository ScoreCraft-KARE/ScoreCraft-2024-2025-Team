import { createClient } from '@supabase/supabase-js'
import Cookies from 'js-cookie'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Core Members API
export const coreMembers = {
  // Get all core members
  async getAll() {
    const { data, error } = await supabase
      .from('core_members')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data
  }
}

// Mentors API
export const mentors = {
  // Get all mentors
  async getAll() {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data
  }
}

// Events API
export const events = {
  // Get all events (public)
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Admin-only functions
  admin: {
    // Add a new event
    async create(event) {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()
      
      if (error) throw error
      return data[0]
    },

    // Update an event
    async update(id, updates) {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    },

    // Delete an event
    async delete(id) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    }
  }
}

// Upcoming Events API
export const upcomingEvents = {
  // Get all upcoming events (public)
  async getAll() {
    const { data, error } = await supabase
      .from('upcomming_events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Admin-only functions
  admin: {
    // Add a new upcoming event
    async create(event) {
      const { data, error } = await supabase
        .from('upcomming_events')
        .insert([event])
        .select()
      
      if (error) throw error
      return data[0]
    },

    // Update an upcoming event
    async update(id, updates) {
      const { data, error } = await supabase
        .from('upcomming_events')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    },

    // Delete an upcoming event
    async delete(id) {
      const { error } = await supabase
        .from('upcomming_events')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    }
  },

  // Move completed events (admin only)
  async moveCompletedEvents() {
    const today = new Date().toISOString().split('T')[0]
    
    // Get completed events
    const { data: completedEvents, error: fetchError } = await supabase
      .from('upcomming_events')
      .select('*')
      .lte('date', today)
    
    if (fetchError) throw fetchError
    
    if (completedEvents.length > 0) {
      // Insert into events table
      const { error: insertError } = await supabase
        .from('events')
        .insert(completedEvents)
      
      if (insertError) throw insertError
      
      // Delete from upcoming events table
      const { error: deleteError } = await supabase
        .from('upcomming_events')
        .delete()
        .in('id', completedEvents.map(event => event.id))
      
      if (deleteError) throw deleteError
    }
    
    return { movedCount: completedEvents.length }
  }
}

// Contact Form API
export const contactSubmissions = {
  // Submit a contact form
  async create(submission) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submission])
      .select()
    
    if (error) throw error
    return data[0]
  }
}

// Admin Authentication API
export const adminAuth = {
  async login(username, password) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('Invalid credentials');
    
    return data;
  },

  async verifyToken() {
    const token = Cookies.get('admin_token');
    if (!token) return false;

    try {
      // Try to decode the token to get the username
      const [username] = atob(token).split(':');
      
      // Check if this username exists in admin_users
      const { data, error } = await supabase
        .from('admin_users')
        .select('username')
        .eq('username', username)
        .single();
      
      if (error || !data) {
        Cookies.remove('admin_token');
        return false;
      }
      
      return true;
    } catch (error) {
      Cookies.remove('admin_token');
      return false;
    }
  }
}

// Test connection (useful for debugging)
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('mentors')
      .select('id')
      .limit(1)
    
    if (error) throw error
    return { success: true, message: 'Connection successful' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}