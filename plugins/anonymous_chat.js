async function handler(m, { command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.sendButton(m.chat, '*No estas en un chat anonimo*\n*Quieres inicar uno?*\n*Da click en el siguiente Boton*', author, null, [['πΈπ½πΈπ²πΈπ°π π²π·π°π π°π½πΎπ½πΈπΌπΎ', `.start`]], m)
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.sendButton(other, '*El otro usario abandono el chat anonimo*\n*Quieres volver a un chat anonimo?*\n*Da click en el siguiente Boton*', author, null, [['πΈπ½πΈπ²πΈπ°π π²π·π°π π°π½πΎπ½πΈπΌπΎ', `.start`]], m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendButton(m.chat, '*TodavΓ­a estΓ‘s en un chat anΓ³nimo, o esperando una persona para ingresar*\n*Quieres salir del chat anonimo?*\n*Da click en el siguiente Boton*', author, null, [['ππ°π»πΈπ π³π΄π» π²π·π°π π°π½πΎπ½πΈπΌπΎ', `.leave`]], m)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButton(room.a, '*Una persona se ha unido al chat anonimo, el chat ha iniciado*', author, null, [['πΈπ π° πΎπππΎ π²π·π°π', `.next`]], m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendButton(room.a, '*Una persona se ha unido al chat anonimo, el chat ha iniciado*', author, null, [['πΈπ π° πΎπππΎ π²π·π°π', `.next`]], m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButton(m.chat, '*Esperando a otra persona para iniciar el chat anonimo*\n*Si quieres salir del Chat anonimo da click en el siguiente Boton*', author, null, [['ππ°π»πΈπ π³π΄π» π²π·π°π π°π½πΎπ½πΈπΌπΎ', `.leave`]], m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']
handler.private = true
export default handler
