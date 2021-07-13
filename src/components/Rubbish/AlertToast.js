
import React from "react";
import ReactDOM from "react-dom";
import { Alert } from 'reactstrap';

class AlertToast extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        visible : false,
        msg : '',
        color : 'danger'
      }
    }
  
    componentDidMount() {
      this.setState({
        visible : this.props.visible,
        msg : this.props.msg,
        color : this.props.color
      });

      console.log(this.state);
    }

    componentDidUpdate(){
      console.log(this.state);
    }
    onShowAlert = ()=>{
      this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },2000)
      });
    }

    render(){ 
              return(
                      <div className="container">
                          <Alert className="text-center" color={this.state.color||"danger"} isOpen={this.state.visible}>
                            {this.state.msg}
                          </Alert>
                      </div>
                    );
            }
  }

  export default AlertToast;