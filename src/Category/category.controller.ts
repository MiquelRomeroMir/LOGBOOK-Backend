import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  @ApiOperation({ summary: 'Obtenir totes les categories amb nom i imatge' })
  @ApiResponse({ status: 200, description: 'Categories obtingudes correctament.' })
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id/business')
  @ApiOperation({ summary: 'Obtenir tots els negocis d’una categoria' })
  @ApiParam({ name: 'id', description: 'ID de la categoria' })
  @ApiResponse({ status: 200, description: 'Negocis obtinguts correctament.' })
  async getBusinessesByCategory(@Param('id') id: string) {
    return this.categoryService.getBusinessesByCategory(Number(id));
  }
}
