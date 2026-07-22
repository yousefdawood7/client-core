import PageContainer from '@/components/page-container'
import CreateUserForm from '@/features/createUser/components/creat-user-form'

export default function page() {
  return (
    <PageContainer title="Create User" subtitle="Create a new user account">
        <CreateUserForm/>
    </PageContainer>
  )
}
