import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir totes les categories amb nom i imatge' })
  @ApiResponse({ status: 200, description: 'Categories obtingudes correctament.' })
  async getCategories() {
    return this.categoryService.getCategories();
  }
}
