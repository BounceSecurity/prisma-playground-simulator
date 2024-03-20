import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

async function main() {

  const firstName = await prisma.$queryRaw`SELECT name FROM "User" LIMIT 1`
  const firstNameStr = firstName[0]["name"];
  const secondName = await prisma.$queryRaw`SELECT name FROM "User" WHERE name not in (${firstNameStr}) LIMIT 1`
  const secondNameStr = secondName[0]["name"];



  /*
  const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` // SQL Injection
  const query = 'SELECT id, name FROM "User" WHERE name = ' + inputString
  const result = await prisma.$queryRawUnsafe(query)
  
  console.log(result)
*/
  /*
    const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
    const result =  await prisma.$queryRaw`SELECT id, name FROM "User" WHERE name = ${inputString}`;
    console.log(result)
  
   
    
    //Unsafely generate query
    const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` // SQL Injection
    const query = `SELECT id, name FROM "User" WHERE name = ${inputString}`;
  
    // Make into a tagged template
    const stringsArray = [...[query]];
    stringsArray.raw = [query];
  
    // Use queryRaw
    const result = await prisma.$queryRaw(stringsArray);
    console.log(result);
   
  
    const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
    const result = await prisma.$queryRaw`SELECT id, name FROM "User" WHERE name = ${Prisma.raw(inputString)}`;
    console.log(result);
  
    
  
    const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
    const result = await prisma.$queryRaw`SELECT id, name FROM "User" WHERE name = ${Prisma.raw(inputString)}`;
    console.log(result);
  
  
    const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
    const query = Prisma.raw(`SELECT id, name FROM "User" WHERE name = ${inputString}`);
    const result = await prisma.$queryRaw(query);
    console.log(result);
  
    
  
    const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
    const result = await prisma.$queryRaw(Prisma.raw(`SELECT id, name FROM "User" WHERE name = ${inputString}`));
    console.log(result);
  
     
  
    const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
    const query = Prisma.sql`SELECT id, name FROM "User" WHERE name = ${inputString}`;
    const result = await prisma.$queryRaw(query);
    console.log(result);
  
    //const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
    const inputString = "Guy Beahan"
    const query = Prisma.sql`SELECT id, name FROM "User" WHERE name = $1`;
    query.values = [inputString]
    const result = await prisma.$queryRaw(query);
    console.log(result);
  
  

  const inputString1 = firstNameStr
  const inputString2 = secondNameStr

  // Safe if the text query below is completely trusted content
  const query1 = `SELECT id, name FROM "User" `
  const query2 = `WHERE (name = $1 OR name = $2)`
  const query3 = `${query1}${query2}`
  //const query = Prisma.sql(`${query1}${query2}`)
  const query: any = Prisma.raw(query3)


  // inputString can be untrusted input
  //const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
  query.values = [inputString1, inputString2]


  const result = await prisma.$queryRaw(query);
  console.log(result);

 

    const query1 = `SELECT id, name FROM "User" WHERE name = `
    const query2 = ` OR name = `

    // inputString can be untrusted input
    //const inputString = `'Sarah' UNION SELECT id, title FROM "Post"`

    const inputString1 = firstNameStr
    const inputString2 = secondNameStr

    const query = Prisma.sql([query1, query2, ""], inputString1, inputString2)
    
    const result = await prisma.$queryRaw(query);
    console.log(result);

     */

    const inputString1 = firstNameStr
    
    const untrustedInput = `lomo@prisma.io' OR '1'='1' OR '1'='1 `
    const queryString1 = `SELECT * FROM "User" WHERE name = `
    const queryString2 = ` AND 1=1`
    
    const query = Prisma.sql([queryString1, queryString2], untrustedInput)
    
    const users = await prisma.$queryRaw(query)
    console.log(users)


    const users2 = await prisma.$queryRawUnsafe(`${queryString1}'${untrustedInput}'${queryString2}`)
    console.log(users2)
    

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })