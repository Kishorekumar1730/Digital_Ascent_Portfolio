# TODO: Update Testimonials with Bio and Rating

## Database Migration
- [x] Create Supabase migration to add `bio` (text, nullable) and `rating` (integer, nullable) to `clients` table
- [ ] Run Supabase migration to update database schema (requires Supabase CLI setup)

## Admin.tsx Updates
- [ ] Update Testimonial type to include bio and rating as nullable fields
- [ ] Modify `handleTestimonialSubmit` to include bio and rating in DB operations
- [ ] Update `fetchTestimonials` to map bio and rating from database
- [ ] Change rating input from number field to star selector component

## Testimonials.tsx Updates
- [ ] Modify fetchTestimonials mapping to include bio and rating from DB
- [ ] Add conditional display for bio below client name
- [ ] Add rating display as stars (e.g., ★★★☆☆) above feedback

## Testing & Verification
- [ ] Run Supabase migration to update schema
- [ ] Test admin form: Add/edit testimonials with bio and rating, verify star selector
- [ ] Test testimonials display: Bio shows conditionally, rating as stars
- [ ] Verify data persistence and real-time updates
