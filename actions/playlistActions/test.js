"use server";

export const testAction = async () => {
  try {
    throw new Error("Error from test action!");
  } catch (error) {
    return { error: error.message };
  }
};
