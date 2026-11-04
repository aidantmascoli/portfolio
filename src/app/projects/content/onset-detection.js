// Freeform write-up for Onset Detection, shown below the summary card on /projects/onset-detection.
// See ./_example.js for every building block (images, videos, columns, galleries...).
// Source: Project 2 report, README, index.ipynb (development) and eval.ipynb (evaluation).

import {Section, Columns, Stack, Figure, Callout} from "@/app/projects/_components/blocks";

// Single-feature novelty functions, each with its threshold tuned on training data (top results from index.ipynb).
const FEATURES = [
    { name: "MFCC 0", f1: "0.481", used: true },
    { name: "RMSE (baseline)", f1: "0.467", used: true },
    { name: "Spectral flux", f1: "0.380", used: true },
    { name: "MFCC 3", f1: "0.351", used: false },
    { name: "MFCC 2", f1: "0.333", used: false },
    { name: "Zero-crossing rate", f1: "0.278", used: false },
];

const CELL = "px-3 py-2 border-b border-default-200";

export default function Content() {
    return <>
        <Section title="The Problem">
            <p>
                Onset detection asks a simple question: where are the beats? Given only the raw audio of a song, the
                model has to mark each moment a new note or hit begins, and from those, work out the tempo. It&rsquo;s
                a core task in music information retrieval, and it sits underneath things like beat tracking, DJ
                software, and rhythm games.
            </p>
            <p>
                We worked with the Ballroom dataset: 698 thirty-second excerpts across eight dance styles, each
                annotated with every beat and the track&rsquo;s tempo. After converting the annotations to CSVs and
                caching per-track metadata (sample rate, style, length), we split the tracks into training and testing
                sets (140 test tracks) so every number below comes from audio the model never tuned on.
            </p>
        </Section>

        <Section title="Measuring Success">
            <p>
                We followed the evaluation standards from MIREX (the Music Information Retrieval Evaluation eXchange).
                A detected onset within &plusmn;50&nbsp;ms of a real beat is a true positive, a beat with no detection
                nearby is a false negative, and a detection with no beat nearby is a false positive. From those we
                computed:
            </p>
            <ul>
                <li><strong>Precision</strong>: how many detected onsets were real beats</li>
                <li><strong>Recall</strong>: how many real beats were detected</li>
                <li><strong>F1 score</strong>: the harmonic mean of the two, which is what we optimized</li>
            </ul>
        </Section>

        <Section title="Baseline Model">
            <Columns>
                <Stack>
                    <p>
                        The baseline uses a <strong>novelty function</strong>: the first derivative of each
                        track&rsquo;s RMS energy (1024-sample frames, 512-sample hop), with negative values trimmed,
                        since only increases in energy suggest a new onset. Any peak above a threshold counts as a
                        detected beat.
                    </p>
                    <p>
                        A hand-picked threshold of 0.03 gave an F1 score of 45.0%. Rather than brute-forcing every
                        value, we wrote a gradient ascent loop that nudges the threshold, measures how the average
                        training F1 changes, and steps in the better direction. It settled on 0.03729, raising test
                        F1 to 46.7%.
                    </p>
                </Stack>
                <Figure src="/images/onset-detection/gradient-ascent.png" width={579} height={453}
                        alt="Line chart of training F1 score rising from about 0.475 to 0.488 over 100 gradient ascent epochs"
                        caption="Average training F1 over 100 epochs of threshold optimization" />
            </Columns>
            <Figure src="/images/onset-detection/baseline-naive-vs-optimized.png" width={651} height={491} size="md"
                    alt="Bar chart: naive baseline at 36.7% precision, 66.9% recall, 45.0% F1; optimized baseline at 42.5% precision, 60.5% recall, 46.7% F1"
                    caption="Optimizing the threshold traded some recall for precision, for a net gain in F1" />
            <p>
                Plotting the novelty function against the ground truth showed the baseline&rsquo;s weakness: some of its
                tallest peaks don&rsquo;t land on beats at all, and many real beats sit on tiny peaks. Energy alone
                isn&rsquo;t enough.
            </p>
        </Section>

        <Section title="Improved Model">
            <Columns align="start">
                <Stack>
                    <h3>Feature selection</h3>
                    <p>
                        To give the model more to work with, we extracted several new features for every track:
                        spectral flux (changes in the spectrum, not just loudness), the squared derivative of the
                        zero-crossing rate (changes in rough pitch), and the derivatives of 20 Mel-frequency cepstral
                        coefficients (changes in timbre). Each one was tested on its own as a novelty function, with its
                        threshold tuned by the same gradient ascent.
                    </p>
                    <p>
                        Only MFCC 0 beat RMSE on its own, but the top three (MFCC 0, RMSE, and spectral flux) capture
                        different kinds of change, so we combined them.
                    </p>
                </Stack>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="font-semibold">
                                <th className={CELL}>Feature</th>
                                <th className={`${CELL} text-right`}>Test F1 (alone)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FEATURES.map(f => (
                                <tr key={f.name} className={f.used ? "font-semibold" : "text-default-500"}>
                                    <td className={CELL}>{f.name}{f.used && " ✓"}</td>
                                    <td className={`${CELL} text-right`}>{f.f1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-sm text-default-500 mt-2">Top six of 23 features tested; ✓ marks the three combined into the improved model.</p>
                </div>
            </Columns>

            <h3>Weighting the features</h3>
            <p>
                Simply adding the three normalized features (with a fixed 0.5 peak threshold) actually scored slightly
                lower than the baseline. The fix was a <strong>weighted sum</strong>. A grid search over weight
                combinations found a strong starting point of (1.4, 1, 1.4) for RMSE, spectral flux, and MFCC&nbsp;0,
                and then we extended the gradient ascent to multiple variables: each epoch nudges every weight
                individually, measures its effect on F1, and moves along the resulting gradient. The final weights were
                (1.595, 0.893, 1.630).
            </p>
            <Figure src="/images/onset-detection/improved-naive-vs-optimized.png" width={651} height={491} size="md"
                    alt="Bar chart: naive improved model at 51.4% precision, 47.9% recall, 46.0% F1; optimized at 47.1% precision, 63.2% recall, 50.4% F1"
                    caption="Weighting raised the model's sensitivity: recall jumped by over 15 points and F1 by nearly 5" />
        </Section>

        <Section title="Results">
            <p>
                On one percussion-heavy test track, the difference is easy to see. Blue lines are the true beats and red
                lines are detections. The improved novelty function lines up with the beat grid far more cleanly, and
                on this track F1 rose from 59.5% to 65.4%.
            </p>
            <Columns>
                <Figure src="/images/onset-detection/baseline-ground-truth.png" width={556} height={413}
                        alt="Baseline RMSE novelty function over 30 seconds with ground truth beats as blue lines"
                        caption="Baseline novelty vs. ground truth beats" />
                <Figure src="/images/onset-detection/improved-ground-truth.png" width={556} height={413}
                        alt="Improved weighted novelty function over 30 seconds with ground truth beats as blue lines"
                        caption="Improved novelty vs. ground truth beats" />
            </Columns>
            <Columns>
                <Figure src="/images/onset-detection/baseline-detected.png" width={556} height={413}
                        alt="Baseline novelty function with detected onsets as red lines, clustered unevenly"
                        caption="Baseline detections (P 49.0%, R 75.8%, F1 59.5%)" />
                <Figure src="/images/onset-detection/improved-detected.png" width={556} height={413}
                        alt="Improved novelty function with detected onsets as red lines, more evenly spaced"
                        caption="Improved detections (P 54.3%, R 82.3%, F1 65.4%)" />
            </Columns>
            <p>
                Across the full test set, both optimized models involved a precision/recall trade-off on their own, but
                the improved model beats the baseline on all three metrics at once, because it changes what the model
                listens to rather than just how sensitive it is.
            </p>
            <Figure src="/images/onset-detection/baseline-vs-improved.png" width={651} height={491} size="md"
                    alt="Bar chart: baseline 42.5% precision, 60.5% recall, 46.7% F1; improved 47.1% precision, 63.2% recall, 50.4% F1"
                    caption="Optimized baseline vs. improved model on the 140-track test set" />
        </Section>

        <Section title="Extension: Tempo Estimation">
            <Columns>
                <Stack>
                    <p>
                        With a better novelty function in hand, we used it to estimate tempo. Autocorrelating the
                        novelty function shows how strongly it repeats at each lag; converting lags to BPM (using the
                        hop length and sample rate) gives a <strong>beat histogram</strong>, whose peaks are candidate
                        tempos. The naive model picks the strongest peak between 40 and 300&nbsp;BPM.
                    </p>
                    <p>
                        Counting an estimate as correct within 8% of the true tempo (the MIREX standard), the naive model
                        got 36.4% of test tracks right.
                    </p>
                </Stack>
                <Figure src="/images/onset-detection/beat-histogram.png" width={572} height={453}
                        alt="Beat histogram from autocorrelation with its strongest peak near 172 BPM and a smaller peak near 86 BPM"
                        caption="Beat histogram for one track: the top peak (172 BPM) is double the true tempo (84 BPM)" />
            </Columns>
            <Columns>
                <Figure src="/images/onset-detection/tempo-distribution.png" width={568} height={453}
                        alt="Histogram of training-set tempos clustered between 80 and 130 BPM, with a fitted normal curve"
                        caption="Training-set tempos with a fitted normal distribution" />
                <Stack>
                    <p>
                        The scatter plots showed most errors were <strong>tempo doubling and halving</strong>: the model
                        locked onto every other beat, or onto subdivisions, and those wrong answers sat at the extreme
                        ends of the range. To counter that, we fit a normal distribution to the training tempos and used
                        it to re-weight each peak&rsquo;s confidence, so common tempos win close calls.
                    </p>
                    <p>That raised accuracy to <strong>45.7%</strong>, a gain of over 9 percentage points.</p>
                </Stack>
            </Columns>
            <Columns>
                <Figure src="/images/onset-detection/tempo-naive.png" width={571} height={455}
                        alt="Scatter of estimated vs. actual tempo with many points on the doubled and halved tempo lines"
                        caption="Before: many points on the 2× and ½× lines (36.4% correct)" />
                <Figure src="/images/onset-detection/tempo-optimized.png" width={571} height={455}
                        alt="Scatter of estimated vs. actual tempo with more points on the correct diagonal"
                        caption="After weighting: most doubling and halving errors removed (45.7% correct)" />
            </Columns>
        </Section>

        <Callout title="What I learned">
            <p>
                The biggest gains came from understanding the signal, not from tuning: plotting the novelty function
                against real beats showed why energy alone fell short, and the tempo scatter plots pointed straight at
                the doubling and halving problem. The model is far from perfect, especially on tracks with little
                percussion. Next steps would be more sophisticated peak picking, an inter-onset-interval approach to
                tempo, or a learned model that classifies onsets frame by frame.
            </p>
        </Callout>
    </>;
}
