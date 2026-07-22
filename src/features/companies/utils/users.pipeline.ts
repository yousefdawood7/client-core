export const usersPipeline = {
    where: {
        // role: "sales",
    },
    select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        company: {
            select: {
                id: true,
                name: true,
                url: true,
            },
        },
    },
}