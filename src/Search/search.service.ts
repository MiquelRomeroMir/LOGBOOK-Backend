// src/search/search.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SearchService {
    constructor(
        @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    ) { }

    /**
     * Cerca negocis.
     * - q (opcional): text a name/description
     * - categoryId (opcional): filtra per category_id
     * - city (opcional): es busca dins d'address
     * - date (opcional): dia en format YYYY-MM-DD (actualment no es fa servir
     *   per filtrar a la BD, però es rep i es podria usar per disponibilitat).
     */
    async searchBusinesses(
        q?: string,
        categoryId?: number,
        city?: string,
        date?: string,
    ): Promise<any[]> {
        let query = this.supabase
            .from('business')
            .select(
                `
        business_id,
        name,
        description,
        images,
        address,
        latitude,
        longitude,
        category:category_id (
          id,
          name
        )
      `,
            );

        if (q && q.trim()) {
            query = query.or(
                `name.ilike.%${q}%,description.ilike.%${q}%`,
            );
        }

        if (categoryId) {
            query = query.eq('category_id', categoryId);
        }

        if (city && city.trim()) {
            query = query.ilike('address', `%${city.trim()}%`);
        }

        // 'date' està disponible si vols fer filtratge de disponibilitat aquí.
        // Per ara, només el validem per format bàsic i l'ignorem a la query.
        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            // si el format és dolent, simplement l'ignorem (no trenquem res)
            date = undefined;
        }

        const { data, error } = await query.limit(50);

        if (error) {
            throw new Error(error.message);
        }

        return data ?? [];
    }
}
