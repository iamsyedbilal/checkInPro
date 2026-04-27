import UpdateSettingForm from '../features/settings/UpdateSettingForm'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

export default function Settings() {
  return (
    <Row type="vertical">
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingForm />
    </Row>
  )
}
