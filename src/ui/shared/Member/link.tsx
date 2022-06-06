import * as React from 'react'

interface Props {
  id?: string
  className?: string
}

/**
 * Routable channel
 */
class MemberLink extends React.PureComponent<Props> {
  render() {
    // const { url } = this.state
    return (
      <span // a
        // href={url}
        {...{
          className: this.props.className,
          children: this.props.children
        }}
        // onClick={this.handleClick.bind(this)}
      />
    )
  }
}

export default MemberLink
