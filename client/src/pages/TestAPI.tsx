import { useState } from "react"
import { serverConnection } from "../services/test"
import { v4 } from 'uuid';

const terminalStyle = {
    margin: '10px',
    width: '45rem',
    height: '20rem',
    maxHeight: '20rem',
    borderRadius: '10px',
    overflow: 'hidden',
}

const containerFlex = {
    display: 'flex'
}

const textStandar = {
    color: 'white',
}

const mainTerminalStyle = {
    width: '100%'
}

const headerTerminal = {
    ...mainTerminalStyle,
    ...containerFlex,
    backgroundColor: 'grey',
    height: '10%',
}

const titleTerminalStyle = {
    ...textStandar,
    display: 'grid',
    width: '85%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',

}

const bodyTerminal = {
    ...mainTerminalStyle,
    ...textStandar,
    height: '90%',
    paddingTop: '5px',
    paddingLeft: '5px',
    paddingRigth: '5px',
    backgroundColor: 'black',
    overflow: 'scroll',
}

const buttons = {
    width: '15%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
}

const buttonsShape = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: '1rem',
    height: '1rem',
    color: '#323831be'
}

const buttonMaximize = {
    ...buttonsShape,
    backgroundColor: 'yellow',
}

const buttonMinimize = {
    ...buttonsShape,
    backgroundColor: 'rgba(44, 238, 26, 0.747)',
}

const buttonClose = {
    ...buttonsShape,
    backgroundColor: 'red',
}

const iconStyle = {
    width: '0.5rem',
}

const statusCodeError = {
    color: 'red'
}

const statusCodeSuccess = {
    color: 'rgba(44, 238, 26, 0.747)'
}

const statusCodeWarn = {
    color: 'yellow'
}

export function TestAPI() {
    const [logs, setLogs] = useState<Array<string>>([]);

    const handleOnClick = async (e: any) => {
        const res: any = await serverConnection(e.target.id)
        if (res) {
            let newMessage: Array<any> = [{}];
            newMessage = [...logs, res]
            setLogs(newMessage)
        }
    }

    const closeTerminal = (e: any) => {
        e.preventDefault();
        setLogs([])

    }

    const minimizeTerminal = (e: any) => {
        e.preventDefault();
        document.getElementById('body-terminal')!.style.display = 'none';

    }

    const maximizeTerminal = (e: any) => {
        e.preventDefault();
        document.getElementById('body-terminal')!.style.display = 'block';

    }

    return (
        <>
            <div style={containerFlex} className="container-test">
                <div className="border-test" style={{
                    margin: '2em'
                }}>
                    <h2>Test API de fotos</h2>
                    <div className="content-test">
                        <div className="label-test">
                            <label>Test del método GET</label>
                        </div>
                        <div className="button-test">
                            <button id="GET" type="button" onClick={handleOnClick} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                    <div className="content-test">
                        <div className="label-test">
                            <label>Test del método POST</label>
                        </div>
                        <div className="button-test">
                            <button id="POST" type="button" onClick={handleOnClick} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                    <div className="content-test">
                        <div className="label-test">
                            <label>Test del método PUT</label>
                        </div>
                        <div className="button-test">
                            <button id="PUT" type="button" onClick={handleOnClick} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                    <div className="content-test">
                        <div className="label-test">
                            <label>Test del método DELETE</label>
                        </div>
                        <div className="button-test">
                            <button id="DELETE" type="button" onClick={handleOnClick} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                </div>
                <div style={terminalStyle} className="terminal">
                    <div style={headerTerminal}>
                        <div style={titleTerminalStyle}>
                            Respuesta del servidor de fotos
                        </div>
                        <div style={buttons}>
                            <div style={buttonMinimize} onClick={minimizeTerminal}><img src="/default/menos.png" style={iconStyle} title="cerca iconos" /></div>
                            <div style={buttonMaximize} onClick={maximizeTerminal}><img src="/default/maximizar.png" style={iconStyle} title="cerca iconos" /></div>
                            <div style={buttonClose} onClick={closeTerminal}><img src="/default/cerrar.png" style={iconStyle} title="cerca iconos" /></div>
                        </div>
                    </div>
                    <div id="body-terminal" style={bodyTerminal}>
                        {logs.length > 0 ? logs.map((log: any) => (
                            <div key={v4()}>{`> ${log.message}`}<p style={log.status===200 ? statusCodeSuccess : log.status <= 500 ? statusCodeError : statusCodeWarn}>Status code: {log.status}</p></div>
                        )) : <div></div>}
                    </div>
                </div>
            </div>
        </>
    )
}