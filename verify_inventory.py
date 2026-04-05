from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("file:///app/inventory.html")
    page.wait_for_timeout(1000)

    # Click first color
    first_color = page.locator("#color-filters-container button").first
    if first_color.is_visible():
        first_color.click()
        page.wait_for_timeout(1000)

    # Click second color
    second_color = page.locator("#color-filters-container button").nth(1)
    if second_color.is_visible():
        second_color.click()
        page.wait_for_timeout(1000)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/inventory_colors.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
