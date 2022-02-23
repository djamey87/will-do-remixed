import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const botUser = await db.user.create({
    data: {
      username: "bot",
      passwordHash:
        "$2a$12$JKeo4t5CGJsOgzi.ZNs39uSx4p3zpyV656sknk7BdgFXpEuUNPKxi",
    },
  });

  await Promise.all(
    getNotes().map((note) => {
      const seededNote = {
        ...note,
        authorId: botUser.id,
      };
      return db.note.create({ data: seededNote });
    })
  );
}

seed();

function getNotes() {
  return [
    {
      title: "First Note",
      content: `This is my note, there are many like them, but this is my own`,
    },
  ];
}
