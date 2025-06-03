function Footer() {
    const date = new Date().getFullYear()

    return (
        <p className="w-full text-zinc-700 text-center py-4">Todos direitos reservados &copy;Millenium {date}</p>
    )
}

export default Footer