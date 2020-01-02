import React, { PureComponent } from "react";

interface Props {
    content: string;
}

export default class TextSpoiler extends PureComponent<Props, any> {
    constructor(props) {
        super(props);
        this.state = { showing: false, hover: false, role: "button" };
        this.onHover = this.onHover.bind(this);
        this.onClick = this.onClick.bind(this);
        this.computeStyle = this.computeStyle.bind(this);
    }

    onHover() {
        if (this.state.showing) return;
        this.setState({ hover: !this.state.hover });
    }

    onClick() {
        if (this.state.showing) return;
        this.setState({ showing: true, role: "presentation" });
    }

    computeStyle() {
        if (this.state.showing) return { background: "hsla(0, 0%, 100%, .1)", color: "inherit" };
        if (this.state.hover) return { background: "rgba(0, 0, 0, 31%)", color: "rgba(0, 0, 0, 0%)", cursor: "pointer" };
        return { background: "rgba(0, 0, 0, 41%)", color: "rgba(0, 0, 0, 0%)" };
    }

    render() {
        return (
            <span role={this.state.role} style={this.computeStyle()} onClick={this.onClick}  onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
                {this.props.content}
            </span>
        );
    }

}