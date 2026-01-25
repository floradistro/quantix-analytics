import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Singleton instances
let authClientInstance: SupabaseClient | null = null
let dataClientInstance: SupabaseClient | null = null
let vendorClientInstance: SupabaseClient | null = null

// Lazy getters to avoid build-time initialization errors
const getAuthUrl = () => process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL || ''
const getAuthKey = () => process.env.NEXT_PUBLIC_SUPABASE_AUTH_ANON_KEY || ''
const getDataUrl = () => process.env.NEXT_PUBLIC_SUPABASE_DATA_URL || ''
const getDataKey = () => process.env.NEXT_PUBLIC_SUPABASE_DATA_ANON_KEY || ''
const getVendorUrl = () => process.env.NEXT_PUBLIC_SUPABASE_VENDOR_URL || ''
const getVendorKey = () => process.env.NEXT_PUBLIC_SUPABASE_VENDOR_ANON_KEY || ''

// Auth client - for login/signup only (singleton, lazy init)
export const getSupabaseAuth = (): SupabaseClient => {
  if (!authClientInstance) {
    authClientInstance = createClient(getAuthUrl(), getAuthKey(), {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        storageKey: 'whaletools-auth-tkicdgegwqmiybpnrazs',
        detectSessionInUrl: true,
      },
    })
  }
  return authClientInstance
}
export const supabaseAuth = getSupabaseAuth()

// Data client - for database and storage operations (singleton, lazy init)
export const getSupabaseData = (): SupabaseClient => {
  if (!dataClientInstance) {
    dataClientInstance = createClient(getDataUrl(), getDataKey(), {
      auth: {
        persistSession: false,
        storageKey: 'whaletools-data-elhsobjvwmjfminxxcwy',
      },
      global: {
        headers: {
          'x-my-custom-header': 'whaletools-coa-generator',
          'x-client-info': 'whaletools/1.0.0'
        },
      },
    })
  }
  return dataClientInstance
}
export const supabaseData = getSupabaseData()

// Vendor client - for marketplace vendors, products, and COAs (singleton, lazy init)
export const getSupabaseVendor = (): SupabaseClient => {
  if (!vendorClientInstance) {
    vendorClientInstance = createClient(getVendorUrl(), getVendorKey(), {
      auth: {
        persistSession: false,
        storageKey: 'whaletools-vendor-uaednwpxursknmwdeejn',
      },
      global: {
        headers: {
          'x-my-custom-header': 'whaletools-vendor-integration',
          'x-client-info': 'whaletools/1.0.0'
        },
      },
    })
  }
  return vendorClientInstance
}
export const supabaseVendor = getSupabaseVendor()

// Default export for backward compatibility (use data client)
export const supabase = supabaseData 