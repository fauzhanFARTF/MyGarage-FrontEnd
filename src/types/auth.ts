export interface LoginCredentials {
  username: string
  password: string
}

export interface TokenPair {
  access: string
  refresh: string
}

// Mirror dari UserProfileSerializer (apps/accounts/serializers.py).
export interface AuthUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  date_joined: string
}
