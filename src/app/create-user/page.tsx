import CreateUserForm from '@/components/creat-user-form'
import PageContainer from '@/components/page-container'

export default function page() {
  return (
    <PageContainer title="Create User" subtitle="Create a new user account">
        <CreateUserForm/>
    </PageContainer>
  )
}
