interface UserProps {
  id: number
  user: {
    username: string
    password: string
    active: boolean
    authority: {
      role: string
    }
  }
  name: string
  email: string
  phone: string
  country: string
  address: string
  imageId: string
}
    
export default UserProps;