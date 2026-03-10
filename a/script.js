  const bar = document.getElementById("spoiler-alert");

        function hasUnrevealedSpoilers() {
            const total = document.querySelectorAll(".spoiler-block").length;
            const revealed = document.querySelectorAll(".spoiler-block.revealed").length;
            return revealed < total;
        }

        function isNearBottom(threshold = 40) {
            return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - threshold);
        }

        function updateBarVisibility() {
            if (!hasUnrevealedSpoilers()) return; // already fully dismissed
            if (isNearBottom()) {
                bar.classList.add("hidden");
            } else {
                bar.classList.remove("hidden");
            }
        }

        function revealBlock(blockEl) {
            blockEl.classList.add("revealed");

            if (!hasUnrevealedSpoilers()) {
                bar.classList.add("hidden");
                setTimeout(() => bar.style.display = "none", 400);
            }
        }

        window.addEventListener("scroll", updateBarVisibility, { passive: true });

        window.addEventListener('load', () => {
            const total = document.querySelectorAll(".spoiler-block").length;
            if (total === 0) bar.style.display = "none";
            else updateBarVisibility();
        });

        // Footnote highlight on click
        document.querySelectorAll('sup a[href^="#fn"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (!target) return;

                // Remove any existing highlight
                document.querySelectorAll('.footnote p.fn-active').forEach(el => el.classList.remove('fn-active'));

                // Add highlight
                target.classList.add('fn-active');

                // Remove after 2.5s
                setTimeout(() => target.classList.remove('fn-active'), 2500);
            });
        });