import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(() => Product, product => product.departments)
    products: Product[];
}