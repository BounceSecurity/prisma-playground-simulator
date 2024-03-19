import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*let categories: any

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function randomCategory() {
    return categories[randomIntFromInterval(1, 25)];
}
*/

async function main() {

    //categories = await prisma.category.findMany();


    // Create 5 users and 5 random categories per user (unconnected)
    const data1 = Array.from({ length: 5 }, () => {
        const user = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            country: faker.address.country(),
            age: 30
        } satisfies Prisma.UserCreateManyInput;

        const categories = Array.from({ length: 5 }, () => ({
            name: faker.company.bsNoun()
        })) satisfies Prisma.CategoryCreateManyInput[];

        return { user, categories }

    });

    await prisma.$transaction([

        prisma.user.deleteMany(),
        prisma.category.deleteMany(),
        prisma.user.createMany({ data: data1.map((d) => d.user) }),
        prisma.category.createMany({ data: data1.flatMap((d) => d.categories) }),
    ]);

    (await prisma.user.findMany()).map((user) =>  {

        const data2 = Array.from({ length: 1 }, () => {

            const profile = {
                bio: faker.name.jobDescriptor(),
                userId: user.id,

            } satisfies Prisma.ProfileCreateManyInput

            const posts = Array.from({ length: 10 }, () => ({
                authorId: user.id,
                title: faker.company.catchPhrase(),
                //categories: [randomCategory(), randomCategory()]
            })) satisfies Prisma.PostCreateManyInput[];

            return { profile, posts }
        });

        prisma.$transaction([
            prisma.profile.createMany({ data: data2.flatMap((d) => d.profile) }),
            prisma.post.createMany({ data: data2.flatMap((d) => d.posts) }),
        ]);

        
    });

    console.log(`Database has been seeded. 🌱`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
