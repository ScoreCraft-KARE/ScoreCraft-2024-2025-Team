import { createClient } from '@supabase/supabase-js'

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
  },

  // Add a new core member
  async create(member) {
    const { data, error } = await supabase
      .from('core_members')
      .insert([member])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update a core member
  async update(id, updates) {
    const { data, error } = await supabase
      .from('core_members')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Delete a core member
  async delete(id) {
    const { error } = await supabase
      .from('core_members')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Team Members API
export const teamMembers = {
  // Get all team members
  async getAll() {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Add a new team member
  async create(member) {
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update a team member
  async update(id, updates) {
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Delete a team member
  async delete(id) {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
    
    if (error) throw error
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
  },

  // Add a new mentor
  async create(mentor) {
    const { data, error } = await supabase
      .from('mentors')
      .insert([mentor])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update a mentor
  async update(id, updates) {
    const { data, error } = await supabase
      .from('mentors')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Delete a mentor
  async delete(id) {
    const { error } = await supabase
      .from('mentors')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Events API
export const events = {
  // Get all events
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

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

// Upcoming Events API
export const upcomingEvents = {
  // Get all upcoming events
  async getAll() {
    const { data, error } = await supabase
      .from('upcomming_events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) throw error
    return data
  },

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
  },

  // Move completed upcoming events to events table
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

// Admin Authentication
export const auth = {
  // Simple admin login (replace with Supabase auth if needed)
  async login(username, password) {
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
    
    if (username === adminUsername && password === adminPassword) {
      // Generate a simple token (in production, use proper JWT)
      const token = btoa(`${username}:${Date.now()}`)
      return { success: true, token, message: 'Hello Admin, welcome!' }
    } else {
      throw new Error('Invalid username or password')
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    // Check for token in localStorage or cookie
    return !!localStorage.getItem('authToken')
  },

  // Logout
  logout() {
    localStorage.removeItem('authToken')
  }
}

// Contact submissions (if needed)
export const contactSubmissions = {
  // Submit a contact form
  async create(submission) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submission])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Get all contact submissions (admin only)
  async getAll() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Test connection
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