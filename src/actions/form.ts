'use server';

import { currentUser } from '@clerk/nextjs';

import prisma from '@/db';
import { formSchema, formSchemaType } from '@/schemas/form';

class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export const getFormStats = async () => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits ?? 0;
  const submissions = stats._sum.submissions ?? 0;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
};

export const createForm = async (data: formSchemaType) => {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Invalid form data');
  }

  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  if (!form) {
    throw new Error('Something went wrong. Please try again later.');
  }

  return form.id;
};

export const getForms = async () => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  return prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getFormById = async (id: number) => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  return prisma.form.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
};

export const updateFormContent = async (id: number, jsonContent: string) => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });

  if (!form) {
    throw new Error('Something went wrong. Please try again later.');
  }

  return form.id;
};

export const publishForm = async (id: number) => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    },
  });

  if (!form) {
    throw new Error('Something went wrong. Please try again later.');
  }

  return form.id;
};

export const getFormContentByUrl = async (url: string) => {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: url,
    },
  });
};

export const submitForm = async (url: string, content: string) => {
  return await prisma.form.update({
    select: {
      id: true,
    },
    data: {
      submissions: {
        increment: 1,
      },
      formSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: url,
      published: true,
    },
  });
};

export const getFormWithSubmissions = async (id: number) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      formSubmissions: true,
    },
  });
};
