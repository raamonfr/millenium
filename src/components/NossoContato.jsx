import { useState } from "react"
import emailjs from '@emailjs/browser'

function NossoContato() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    function sendEmail(e) {
        e.preventDefault()

        if (name === '' || email === '' || message === '') {
            alert("Preencha todos os campos")
            return
        }

        const templateParams = {
            from_name: name,
            message: message,
            email: email
        }

        emailjs.send("service_xfxmpms", "template_ey3hkue", templateParams, "mZVMzhhQjHr-IeZ8L").then((response) => {
            console.log("Email enviado", response.status, response.text)
            setName('')
            setEmail('')
            setMessage('')
        }, (err) => {
            console.log("ERRO: ", err)
        })
    }

    return (
        <div id="nossoContato" className="p-40 m-auto">
            <h1 className="font-bold text-center mb-14">Contato Conosco</h1>

            <form className="space-y-12" onSubmit={sendEmail}>
                <input
                type="text"
                placeholder="Nome da sua empresa"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
                />

                <input
                type="text"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
                />

                <textarea
                placeholder="Digite sua mensagem..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="w-full p-2 border-b-4 border-zinc-800 bg-transparent text-white mt-1"
                />

                <input type="submit" value="Enviar" className="w-full px-6 py-2 font-bold border-2 border-transparent bg-blue-500 text-white p-3 rounded-lg transition duration-500 ease-in-out hover:border-current cursor-pointer hover:text-white"/>
            </form>
        </div>
    )
}

export default NossoContato