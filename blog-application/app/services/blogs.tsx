const blogs = [
  { id: 1, author: "Fredrick Onyango", url: "https://localhost:fred.com", title: "I love myself", likes: 5, year: 2050 },
  { id: 2, author: "Oguya Onyango", url: "https://localhost:onyi.com", title: "Love mum", likes: 10, year: 2043 }
]

let nextId = 3

export const getBlogs = () => {
  return blogs;
}

export const addBlog = (author: string, url: string, title: string, likes: number, year: number) => {
  blogs.push({ id: nextId++, author, url, title, likes, year })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}