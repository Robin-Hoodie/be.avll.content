const dayjs = require("dayjs");

const BLOG_ARTICLES_CONTENT_NAME = "api::blog-article.blog-article";

module.exports = {
  archiveArticlePhotos: {
    task: async ({ strapi }) => {
      try {
        const outdatedBlogArticles = await strapi.entityService.findMany(
          BLOG_ARTICLES_CONTENT_NAME,
          {
            filters: {
              createdAt: {
                $lt: dayjs().subtract(6, "month").startOf("day").format(),
              },
            },
            populate: ["coverPhoto"],
          }
        );
        // Can't do this in DB filter, see https://github.com/strapi/strapi/issues/12225
        const outdatedBlogArticlesWithCoverPhoto = outdatedBlogArticles.filter(
          (blogArticle) => blogArticle.coverPhoto !== null
        );
        if (outdatedBlogArticlesWithCoverPhoto.length === 0) {
          return "There are no cover photos to remove from outdated blog articles today";
        }
        const outdatedBlogArticleCoverPhotos =
          outdatedBlogArticlesWithCoverPhoto.map(
            ({ coverPhoto }) => coverPhoto
          );
        console.log(`Removing cover photos from articles 
          ${outdatedBlogArticlesWithCoverPhoto
            .map((blogArticle) => blogArticle.title)
            .join(", ")}`);
        await Promise.all(
          outdatedBlogArticlesWithCoverPhoto.map((blogArticle) =>
            strapi.entityService.update(
              BLOG_ARTICLES_CONTENT_NAME,
              blogArticle.id,
              {
                data: {
                  coverPhoto: null,
                },
              }
            )
          )
        );
        console.log("Cover photos removed from articles");
        await Promise.all(
          // From https://stackoverflow.com/questions/58551844/how-to-delete-file-from-upload-folder-in-strapi
          outdatedBlogArticleCoverPhotos.map(async (coverPhoto) => {
            const coverPhotoEntry = await strapi.db
              .query("plugin::upload.file")
              .delete({
                where: {
                  id: coverPhoto.id,
                },
              });
            return strapi.plugins.upload.services.upload.remove(
              coverPhotoEntry
            );
          })
        );
        console.log("Cover photos removed from Media Library");
      } catch (error) {
        console.log("Something went wrong while removing cover photos", error);
      }
    },
    options: {
      rule: "0 2 * * *",
    },
  },
};
