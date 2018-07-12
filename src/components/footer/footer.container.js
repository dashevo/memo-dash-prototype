import { connect } from 'react-redux'

import FooterComponent from './footer.component'
import { Schema } from '@dashevo/dash-schema/dash-vmn'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    resetVMN: () => {
      Schema.VMN.Util.reset()
      window.location.reload()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterComponent)
