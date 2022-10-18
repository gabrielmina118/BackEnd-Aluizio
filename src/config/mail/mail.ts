interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'saboariaencanta@gmail.com',
      name: 'Saboaria Encantada',
    },
  },
} as IMailConfig;
