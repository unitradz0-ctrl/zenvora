import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Explore() {
  const navigate = useNavigate()
  useEffect(() => { navigate('/marketplace', { replace: true }) }, [])
  return null
}
