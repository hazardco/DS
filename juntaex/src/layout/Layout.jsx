import { Button, Footer, Header } from 'jex-ds'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { data } from "@/nav"
import { getEmailFromToken } from '@/lib/jwt'

export default function Layout() {

    const userMail = getEmailFromToken()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            <Header
                componentSlotList={[
                    <Button iconLeft="user" label="Luis Miguel " />,
                    <Button iconLeft="log-out" onClick={handleLogout} variant="ghost" tooltip="Cerrar sesión" />

                ]}
                headerNavOptionList={data.navMain}
                logo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAAAfCAYAAAAYwAppAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAlISURBVHgB7VzLUhzJFb1Zj1aD7KAUA8ws7FCjhRfeqCXvDcwHWGg+wMDsvBnQfIAAbbxDwh8gwDtvRugHRj1eeKvWD5ia8MYeEUFpAXR3PdLnZr2ySk0TinmoNJMnoqmuyrz5Ik/eV4H47V//eExEHXoP+Ndf/kG/mfmE3gd+94ffk/+fb+l9wA6ThUEw8MnAYAwsMjAwaBQMKQ0MGgZDSgODhsGQ0sCgYTCkNDBoGAwpDQwaBkNKA4OGwSGDxsOZbS8JS+xPrCRFL3x9vk4GHzwMKT8USNGZXC4nl/8EwOHBl2UhrK+zR9IOk1vmRYl3gzFfDQwaBqMpPwBEJ4MeLqL+3J2fOh6rQT3Ps93BSn4bh9QjXVvNufyza5PdVffCCuLvzo/4q/3RNF9WyEq8XNZxiGWXhBC3pRQ3cD0Ow/gbvc22By0ZUSe0LU9oI40c6qgyoKIxPdW8Z7dGS5aUN7ldfiAt6sejFsYbBHQZclnMUUirU8ol/WJMWp1cTEjys7Ucvw5qvu2jiX1rbTvOAHLWkmp7zJpcNWYh5KmU8lUUtft6n4aUP0O02wMvjq3SB7XFekx0kN86Um3GFZBnSz2QdIxyRUrLlkypx5RtHNuhHSnkIrbQEt+nhJPkupYU89M7o+/Od9qfKNItoM9/10wv7FXrReymvYCctwakCN5x3dG2JLoHonh83uRExj1Z7qhou9JatrFdN8S45aYy9Cpy5Ziwycmdm36TkWY1rUTSnXPvhq/DPvFBEdKC64pnKOhkPezHQXBAE+DOTeHncEOS2BZkeWWJWhMQffogDJOd+uEwbszpvAXkRiRmMe6T8231OyADgwmQirgpIWsQUtLWtY+nNukdAK3LnwV8XcXe9C6p9nbb6ea+gQ38It3cl8ptg4xP+SYMWxKfB6jv5+Wg1VdsSYBAAp8tjZDHtp08okljn5/GeohtyDyZMPY1tPs198E3GC/6GT2ZMGYGDAVxnN8YUhpcCSghmFZiDxt+B+bWkVYkkkR8MRi0CZ+AEmhjKXsVWa7Pz/EZUDuA+cjaAXVUPZ83a5LQfSmTZaJkXScQ2n5Ybu4Qmzt8iK/dsm3a4b+4Af3u8Het2zV37vqq0pbu2SmM6M9IzUEB2nG4lR42mQblgJSdfDr47+UBKbQHxot1aOQtbfp73H86hsrYF1qt4VM+SHAoeFo/NZnwDsthjRA5PzvMaxjz1eAqSMdO7uQbFlqIjS82jfON1gElO+wvytk2p2SWRalZpRPJB4Pgwk9vz9XP6+E18JzuBzXfLY3eym9B2jx6C4121gk9rx+G/H2UaxsJRn4ZnVw8iQpZtw9iUmaSY4wJj+8Qpiq5s1MvIfIIhbtpbbHJ5q7e1iRCpkh43n/WbM99EGkzLMd+oI8dqm9FjZ/CjtYIeh0dDILQLx/BlNZcC9UWGRhMAIIRz/UNC63G2/m5Zemn/7tBcdHzgjwgZZGYyQM9sA890hiTJK0uAiq8cbuaYQfeWx1ndnq70nBFFgcDa1l0Fp5c8GECE5JuE9XHLfbCk/MndCUUGZeKOyFvvNV/Nj3KTFv72mgxHLb+6dIof8bm80v4tX3I+7AEXmGGvUrwiQwpDa5AunFKCJHwJfg+ng9MQWzOcLcIfBAVgR6dkDlkWtaphp/lhqjHo2uy0ODeIDNb2b/E5QG0rU5KmK3xXkiTkQaykg4CWaUgNCH6X5koGIkbrjM8xTGmaWmFLuS7qby1hQMD/mT4mQpAkSHlLxW8nW/Te0BKSNrVAx+pn5qRH9pOWHKjIpQoMgTVc4B9XDkxdcE+LP9U/cInxeVhrYqIY8FBoU8ntjNQ0eWAo6SFoJBH9QOrDssa9dl8BqkfY2LP4tjehO98G2TsaAEmBvxLF8Gh67dYsxtSfgjw2p1Wy1qtpAjwrJKjFFaxQdjcxOlbFFmWXCxSIkgFRFGClITojkl9/viQSpstaV3vwzf8nL9oqZUKKeO4xZceNnnxDGFWmKVpCqFAln4oc36pD5umMZIN9iXfGg/MXI7yDv93UZiwHNQB1pBBWUTqA0GY4BBtcJu9PBKNacxEV/afAr8Pvvj4bKbV0npnznBd06Cp/0zUN6RsOkA+EOgFNkEHROvgpM2idGKjVvNl9Zajm0XAZY1JyrIwBTvw4bZqJ/UPAhHZfEHIszAjReyKL7ALH3GiXSXJreEbnlVuk+qIUo24+lYJ9nhrFqSQdITUgTIZOXoK8swgcHJoh7YiQdIarWKdNkKvfbfME7ZhusoFB+kPzULeSUqNzFHeXQRq+uzbZYTkSOrTdBZyNX0W87r/vVxTsdyan3qWJHLPiRThKHaH90DiLfvjqUc5ybXAmOT15z6Ys+iPx9wXYw5GQ8qGA4Tc1wi0hmT82phqvh5STyEPa/lFJftj6sYwOGOtxH6RX45ZsB+HXKEl4V99KWNrDw+faybqOmQWsDl9EIrTHd1xbY8iFbH9HOmMbtk2m8DuZvZygoptMjhPiIjtXUr9SeQ2hxwRzfOKx5ykz8iymPXHLzlwCgMyozfZ8xyoJxfD1wNoy+mDrEz5palfKVaK/tPK7Ifv2vPTfjxKjsKQrRJL1ef1V4dj5ufWcp1+7lOaPGXDYdtyPcvpXQYfdLhff4hNdFDL3RXgTVHLN/6AiGQtL5iDlcKfotiV+OxoOT0uWoLQGqkACOYq9LIM0C7t9uAU67GMu8PLekc7CKzIv7EJmSXuH9deEFD+I66cm6znL7+SnCCR5FebFN/wl/D1OZetXbauhQDW9tejVs91YxwQsVeda0pGnZCo/yIfF8NoyoYjS0csqz/fEvYKBwr4ORLZPpRPHzm/wyA4HxvwYJ8HftpBFEFDSrqpHkLmV5A5g/8ipav8UPhOpXya8tiTxaZJepU208TgseOUG1MPqGSBDZjSyR0EUe4hvZdqPku8wdj5vVK+O6W5NoIbco34vdNEzqiebKRaYKJiDJt5/xwsicu14IuP9iFH25V5aXNT+U9ltiY3HcfyUbKTzyVP73Bb9kcc9aR1BF4y7Swyf5u2uR8EmBax0K/gux5qa8rz4/KDOOYUSTl+7l+9y8omKl3kIi+dWZvnusSv/FXHy2sSH3H9SFtjYf7v608P839fDSbBmK8GBg2DIaWBQcNgSGlg0DAYUhoYNAyGlAYGDYMhpYFBw/B/3uNLboOL7nIAAAAASUVORK5CYII="
                logoLink="/"
                mobileLabel="Accesos directos"
            />

            <main className="content container">
                <Outlet/>
            </main>

            <Footer
                footerText="2024. Junta de Extremadura. Todos los derechos reservados."
                logoFooterList={[
                    {
                        logo: 'data:image/png;base64,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'
                    }
                ]}
            />
        </>
    )
}
