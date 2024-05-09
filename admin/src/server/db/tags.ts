import isUUID from '@utils/isUUID';
import prisma from '@utils/prisma';
import { Category, Product, Tag, Image, Recipe, Blog } from '@prisma/client';

//##########################################################################################
// COMPONENT TYPES >>>>>>>>>>>>>> @TODO: Move to types
//##########################################################################################
type TImage = { images: Image[] };
type TTag = { tags: { tag: Tag }[] };
type TxTag = { tags: { name: string; value: string }[] };
type TSize = { sizes: { size: { name: string; id: string } }[] };

export type TBlog = (Blog & TTag & TImage) | null;
export type TRecipe = (Recipe & TTag & TImage) | null;
export type TProduct = (Product & TTag & TImage) | null;
export type TCategory = (Category & TTag & TImage) | null;
export type TProdCatRec = TProduct | TCategory | TRecipe | TBlog | null;

//##########################################################################################
// ADD TAGS
//##########################################################################################
const addTags = (obj: TProdCatRec) => {
  if (!obj) return null;

  return {
    ...obj,
    tags: obj?.tags.map((tag) => ({
      name: tag.tag.name,
      value: tag.tag.id,
    })),
  };
};

export const addTagsToProduct = (product: TProduct): TProduct & TxTag => {
  return addTags(product) as TProduct & TxTag;
};

export const addTagsToCategory = (category: TCategory) => {
  return addTags(category);
};

export const addTagsToRecipe = (recipe: TRecipe) => {
  return addTags(recipe) as TRecipe;
};

export const addTagsToBlog = (blog: TBlog) => {
  return addTags(blog) as TBlog;
};

//##########################################################################################
// GET TAGS
//##########################################################################################
export const getTags = async (storeId: string) => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        storeId,
      },
    });

    return tags;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//##########################################################################################
// GET TAG BY ID
//##########################################################################################
export const getTagById = async (tagId: string) => {
  try {
    if (!isUUID(tagId)) return null;

    const tag = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
    });

    return tag;
  } catch (error) {
    console.error(error);
    return null;
  }
};
