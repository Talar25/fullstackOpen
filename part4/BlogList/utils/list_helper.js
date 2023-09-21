const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.length === 0 ? 0 : blogs.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => {
  const likes =
    blogs.length === 0
      ? {}
      : blogs.reduce(
          (sum, item) => (sum < item.likes ? item.likes : sum),
          blogs[0].likes
        );

  const blog = blogs.find((blog) => blog.likes === likes);

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((counts, blog) => {
    const author = blog.author;
    counts[author] = (counts[author] || 0) + 1;
    return counts;
  }, {});

  const topAuthor = Object.keys(authorCounts).reduce((a, b) =>
    authorCounts[a] > authorCounts[b] ? a : b
  );

  return { author: topAuthor, blogs: authorCounts[topAuthor] };
};

const mostLikes = (blogs) => {
  const likeCounts = blogs.reduce((counts, blog) => {
    const author = blog.author;
    counts[author] = (counts[author] || 0) + blog.likes;
    return counts;
  }, {});

  const topAuthor = Object.keys(likeCounts).reduce((a, b) =>
    likeCounts[a] > likeCounts[b] ? a : b
  );

  return { author: topAuthor, likes: likeCounts[topAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
