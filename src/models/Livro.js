import 'dotenv/config';
import neo4j from "neo4j-driver";
import { nanoid } from 'nanoid';


const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));
const session = driver.session({ database });

class LivrosClasse{

    static findAll = async () =>{
        const result = await session.run(`Match (u:Livro) return u`)
        return result.records.map(i=>i.get('u').properties)
    }
    static findById = async (id) =>{
        const result = await session.run(`MATCH (u:Livro {_id : '${id}'} ) return u limit 1`)
        return result.records[0].get('u').properties
    }

    static create = async (user) =>{
        const unique_id = nanoid(8)
        await session.run(`CREATE (u:Livro {_id : '${unique_id}', titulo: '${user.titulo}', autor: '${user.autor}', editora: '${user.editora}', numeroPaginas: '${user.numeroPaginas}'} ) return u`)
        return await LivrosClasse.findById(unique_id)
    }
    static findByIdAndUpdate = async (id, user) =>{
        const result = await session.run(`MATCH (u:Livro {_id : '${id}'}) SET u.titulo= '${user.titulo}', u.autor= '${user.autor}', u.editora= '${user.editora}', u.numeroPaginas= '${user.numeroPaginas}' return u`)
        return result.records[0].get('u').properties
    }
    static findByIdAndDelete = async (id) =>{
        await session.run(`MATCH (u:Livro {_id : '${id}'}) DELETE u`)
        return await LivrosClasse.findAll()
    }
}

export default LivrosClasse
