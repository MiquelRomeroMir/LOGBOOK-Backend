// src/search/search.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import {
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get()
    @ApiOperation({
        summary: 'Cercar negocis per text, categoria, ciutat i data',
    })
    @ApiQuery({
        name: 'q',
        required: false,
        description: 'Text de cerca (nom o descripció del negoci, opcional)',
    })
    @ApiQuery({
        name: 'categoryId',
        required: false,
        description: 'ID de la categoria per filtrar (opcional)',
    })
    @ApiQuery({
        name: 'city',
        required: false,
        description: 'Ciutat / part de l\'adreça (opcional)',
    })
    @ApiQuery({
        name: 'date',
        required: false,
        description: 'Data (YYYY-MM-DD), mateix format que /service/:id/reservations',
    })
    @ApiResponse({
        status: 200,
        description: 'Llista de negocis.',
        type: Array,
    })
    async search(
        @Query('q') q?: string,
        @Query('categoryId') categoryId?: string,
        @Query('city') city?: string,
        @Query('date') date?: string,
    ): Promise<any[]> {
        const categoryIdNumber = categoryId ? Number(categoryId) : undefined;
        return this.searchService.searchBusinesses(q, categoryIdNumber, city, date);
    }
}
