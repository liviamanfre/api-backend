// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // Importe NotFoundException

interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {

  private products: Product[] = []; // Array em memória para simular o DB
  private nextId = 1; // Começaremos IDs do 1

  // Para demonstração, vamos adicionar alguns produtos iniciais
  constructor() {
    this.create({ name: 'Fone de Ouvido', price: 99.99 });
    this.create({ name: 'Teclado Mecânico', price: 150.00 });
    this.create({ name: 'Mouse Gamer', price: 75.50 });
  }

  findAll(): Product[] {
    return this.products; // Retorna o array de produtos
  }

  
  findOne(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  // Alternativa para findOne: Lança um erro se o produto não for encontrado
  findOneOrThrow(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }

  create(product: { name: string; price: number }): Product {
    const newProduct = { id: this.nextId++, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

 
  update(id: number, product: { name?: string; price?: number }): Product | undefined {
    const index = this.products.findIndex(p => p.id === id);
    if (index > -1) {
      this.products[index] = { ...this.products[index], ...product };
      return this.products[index];
    }
    return undefined; // Retorna undefined se não encontrou (ou lance um erro)
  }

  
  updateOrThrow(id: number, product: { name?: string; price?: number }): Product {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado para atualização.`);
    }
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  
  remove(id: number): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id); // Reatribuição do array
    return this.products.length < initialLength; // Retorna true se um produto foi removido
  }

  
  removeOrThrow(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado para remoção.`);
    }
    this.products.splice(index, 1); // Remove no local
  }
}