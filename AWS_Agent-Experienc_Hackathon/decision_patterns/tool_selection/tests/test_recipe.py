import pytest
import sys
from pathlib import Path

# Add recipe directory to sys.path
pattern_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(pattern_dir))

from recipe import AdaptiveToolSelector, derive_confidence, DecisionOutput

def test_derive_confidence():
    assert derive_confidence([1.0]) == 1.0
    assert abs(derive_confidence([0.5, 0.5]) - 0.0) < 1e-4
    assert derive_confidence([0.9, 0.1]) > 0.7

def test_selector_registration_and_dispatch():
    options = {
        "tool_a": "Performs operation A",
        "tool_b": "Performs operation B",
    }
    selector = AdaptiveToolSelector(
        decision_question="Choose between tool A and B",
        options_criteria=options,
        timeout_seconds=0.1,
    )

    selector.register_tool("tool_a", lambda x: f"Ran tool A on {x}")
    selector.register_tool("tool_b", lambda x: f"Ran tool B on {x}")

    # Cannot register invalid option
    with pytest.raises(ValueError):
        selector.register_tool("unregistered_tool", lambda x: x)

    # Test dispatch
    mock_decision = DecisionOutput(
        selected_option="tool_a",
        confidence=0.9,
        probabilities={"tool_a": 0.9, "tool_b": 0.1},
        source="unit_test",
        latency_ms=1.0,
        is_live=False,
    )
    result = selector.dispatch(mock_decision, "test_input")
    assert result == "Ran tool A on test_input"
