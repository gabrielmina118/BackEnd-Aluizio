import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// nome da tabela que ele faz o mapeamento
@Entity('products')
class Product {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  // string é o tipo padrão
  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @Column("integer")
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Product
