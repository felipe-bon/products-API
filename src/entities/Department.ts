import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity('departments')
export class Department {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ 
        type: 'text',
        nullable: false,
        unique: true,
     })
    department_name: string

    @ManyToMany(() => Product, product => product.departments, { cascade: true, onDelete: 'CASCADE' })
    products: Product[];
}