import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import OrdersProducts from '../../../order/typeorm/model/OrdersProducts';

// nome da tabela que ele faz o mapeamento
@Entity('products')
class Product {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  // string é o tipo padrão
  @Column()
  name: string;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

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
