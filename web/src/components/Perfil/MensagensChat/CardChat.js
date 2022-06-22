import React from 'react'

export default function CardChat(props){
    return(
        <div className="chat">
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src={props.fotoPerfil} alt="avatar" />
                        </a>

                        <div className="chat-about">
                            <h6 className="m-b-0">{props.nomeChatAtual}</h6>
                            <small>Vai casar em: {props.dataCasamento}</small>
                        </div>
                    </div>

                    <div className="col-lg-6 hidden-sm text-right">
                        <a href="javascript:void(0);" className="btn btn-outline-info">
                            <i className="fa fa-cogs"></i>
                        </a>

                        <a href="javascript:void(0);" className="btn btn-outline-warning">
                            <i className="fa fa-question"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="chat-history">
                <ul className="m-b-0">
                    <li className="clearfix">
                        <div className="message-data text-right">
                            <span className="message-data-time">10:10 AM, Today</span>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                 alt="avatar" />
                        </div>
                        <div className="message other-message float-right"> Hi Aiden, how are
                            you? How is the project coming along?
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:12 AM, Today</span>
                        </div>
                        <div className="message my-message">Are we meeting today?</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:15 AM, Today</span>
                        </div>
                        <div className="message my-message">Project has been already finished
                            and I have results to show you.
                        </div>
                    </li>
                </ul>
            </div>
            <div className="chat-message clearfix">
                <div className="input-group mb-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-send"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Enter text here..." />
                </div>
            </div>
        </div>
    )

}