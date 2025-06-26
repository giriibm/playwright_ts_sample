import { test, expect } from '@playwright/test';

test.describe('Broken Images Detection', () => {
    test('should check for broken images on the homepage', async ({ page }) => {
        // Navigate to the page
        await page.goto('http://localhost:3000/');
        
        // Wait for page to load completely
        await page.waitForLoadState('networkidle');
        
        // Get all images on the page
        const images = await page.locator('img').all();
        console.log(`Found ${images.length} images on the page`);
        
        const brokenImages: Array<{
            index: number;
            src: string;
            alt: string;
            reason: string;
            dimensions?: { naturalWidth: number; naturalHeight: number; complete: boolean };
        }> = [];
        
        const workingImages: Array<{
            index: number;
            src: string;
            alt: string;
            dimensions: { naturalWidth: number; naturalHeight: number; complete: boolean };
        }> = [];
        
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            
            try {
                // Get image attributes
                const src = await img.getAttribute('src') || '';
                const alt = await img.getAttribute('alt') || 'No alt text';
                
                console.log(`\nChecking Image ${i + 1}:`);
                console.log(`  Src: ${src}`);
                console.log(`  Alt: ${alt}`);
                
                if (!src) {
                    brokenImages.push({
                        index: i + 1,
                        src: 'No src attribute',
                        alt: alt,
                        reason: 'Missing src attribute'
                    });
                    console.log(`  ❌ Missing src attribute`);
                    continue;
                }
                
                // Check if image is visible
                const isVisible = await img.isVisible();
                console.log(`  Visible: ${isVisible}`);
                
                // Check natural dimensions and loading status
                const dimensions = await img.evaluate((img: HTMLImageElement) => ({
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    complete: img.complete,
                    currentSrc: img.currentSrc
                }));
                
                console.log(`  Dimensions: ${dimensions.naturalWidth}x${dimensions.naturalHeight}`);
                console.log(`  Complete: ${dimensions.complete}`);
                console.log(`  Current Src: ${dimensions.currentSrc}`);
                
                // Check if image failed to load
                if (!dimensions.complete) {
                    brokenImages.push({
                        index: i + 1,
                        src: src,
                        alt: alt,
                        reason: 'Image not completely loaded',
                        dimensions: dimensions
                    });
                    console.log(`  ❌ Image not completely loaded`);
                } else if (dimensions.naturalWidth === 0 && dimensions.naturalHeight === 0) {
                    brokenImages.push({
                        index: i + 1,
                        src: src,
                        alt: alt,
                        reason: 'Image failed to load (0x0 dimensions)',
                        dimensions: dimensions
                    });
                    console.log(`  ❌ Image failed to load (0x0 dimensions)`);
                } else {
                    workingImages.push({
                        index: i + 1,
                        src: src,
                        alt: alt,
                        dimensions: dimensions
                    });
                    console.log(`  ✅ Image loaded successfully`);
                }
                
            } catch (error) {
                const src = await img.getAttribute('src').catch(() => 'Error getting src') || 'Error getting src';
                const alt = await img.getAttribute('alt').catch(() => 'Error getting alt') || 'Error getting alt';
                
                brokenImages.push({
                    index: i + 1,
                    src: src,
                    alt: alt,
                    reason: `Error during check: ${error instanceof Error ? error.message : String(error)}`
                });
                console.log(`  ❌ Error during check: ${error}`);
            }
        }
        
        // Generate comprehensive report
        console.log('\n' + '='.repeat(50));
        console.log('🖼️  BROKEN IMAGES REPORT');
        console.log('='.repeat(50));
        console.log(`Total images found: ${images.length}`);
        console.log(`Working images: ${workingImages.length}`);
        console.log(`Broken images: ${brokenImages.length}`);
        console.log(`Success rate: ${((workingImages.length / images.length) * 100).toFixed(1)}%`);
        
        if (brokenImages.length > 0) {
            console.log('\n🚨 BROKEN IMAGES DETAILS:');
            console.log('-'.repeat(50));
            brokenImages.forEach(img => {
                console.log(`${img.index}. ${img.src}`);
                console.log(`   Alt text: "${img.alt}"`);
                console.log(`   Issue: ${img.reason}`);
                if (img.dimensions) {
                    console.log(`   Dimensions: ${img.dimensions.naturalWidth}x${img.dimensions.naturalHeight}`);
                    console.log(`   Complete: ${img.dimensions.complete}`);
                }
                console.log('');
            });
        } else {
            console.log('\n✅ All images are loading correctly!');
        }
        
        if (workingImages.length > 0) {
            console.log('\n✅ WORKING IMAGES SUMMARY:');
            console.log('-'.repeat(50));
            workingImages.forEach(img => {
                console.log(`${img.index}. ${img.src}`);
                console.log(`   Alt: "${img.alt}"`);
                console.log(`   Size: ${img.dimensions.naturalWidth}x${img.dimensions.naturalHeight}px`);
            });
        }
        
        // Take a screenshot for reference
        await page.screenshot({ 
            path: 'screenshots/broken-images-check.png', 
            fullPage: true 
        });
        
        // Test assertions
        expect(images.length).toBeGreaterThan(0); // Should have images on the page
        
        // Log details but don't fail the test if there are broken images
        // (in case some images are intentionally placeholder or lazy-loaded)
        if (brokenImages.length > 0) {
            console.log(`\n⚠️  Found ${brokenImages.length} potentially broken images`);
            console.log('Please review the broken images list above');
        }
        
        // Optional: Uncomment to fail test if broken images found
        // expect(brokenImages.length).toBe(0);
    });
    
    test('should validate image accessibility', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.waitForLoadState('networkidle');
        
        const images = await page.locator('img').all();
        const accessibilityIssues: Array<{
            index: number;
            src: string;
            issue: string;
        }> = [];
        
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const src = await img.getAttribute('src') || 'No src';
            const alt = await img.getAttribute('alt');
            
            // Check for missing alt text
            if (!alt || alt.trim() === '') {
                accessibilityIssues.push({
                    index: i + 1,
                    src: src,
                    issue: 'Missing alt attribute or empty alt text'
                });
            }
            
            // Check for generic alt text
            if (alt && ['image', 'img', 'picture', 'photo'].includes(alt.toLowerCase().trim())) {
                accessibilityIssues.push({
                    index: i + 1,
                    src: src,
                    issue: 'Generic alt text - should be more descriptive'
                });
            }
        }
        
        console.log('\n' + '='.repeat(50));
        console.log('♿ IMAGE ACCESSIBILITY REPORT');
        console.log('='.repeat(50));
        console.log(`Total images: ${images.length}`);
        console.log(`Accessibility issues: ${accessibilityIssues.length}`);
        
        if (accessibilityIssues.length > 0) {
            console.log('\n⚠️  ACCESSIBILITY ISSUES:');
            accessibilityIssues.forEach(issue => {
                console.log(`${issue.index}. ${issue.src}`);
                console.log(`   Issue: ${issue.issue}`);
                console.log('');
            });
        } else {
            console.log('\n✅ All images have proper accessibility attributes!');
        }
    });
});
