import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  
  */

  const inputString1 = firstNameStr
  const inputString2 = secondNameStr

  // Safe if the text query below is completely trusted content
  const query1 = `SELECT id, name FROM "User" `
  const query2 = `WHERE (name = $1 OR name = $2)`
  const query3 = `${query1}${query2}`
  //const query = Prisma.sql(`${query1}${query2}`)
  const query = Prisma.raw(query3)


  // inputString can be untrusted input
  //const inputString = `'Sarah' UNION SELECT id, title FROM "Post"` 
  query.values = [inputString1, inputString2]


  const result = await prisma.$queryRaw(query);
  console.log(result);

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