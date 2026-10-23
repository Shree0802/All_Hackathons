"""Minimal Standalone Usage Example for Adaptive Tool Selection Pattern.

Run with:
    python decision_patterns/tool_selection/example.py
"""

from recipe import AdaptiveToolSelector

# 1. Define custom decision question and candidate option criteria
QUESTION = "Given the customer inquiry, which department tool should handle this?"

OPTIONS = {
    "billing_inquiry": "Payment failures, refunds, invoice disputes, and card charges",
    "technical_support": "API timeouts, software bugs, server outages, and crash logs",
    "sales_upgrade": "Enterprise tier inquiries, custom pricing, and licensing quotes",
    "general_triage": "Ambiguous inquiries or greetings requiring human clarification",
}

# 2. Implement your tool functions
def handle_billing(inquiry: str):
    return f"[Billing Service] Processed refund request for: '{inquiry}'"

def handle_technical(inquiry: str):
    return f"[Technical Support] Checked telemetry and log trace for: '{inquiry}'"

def handle_sales(inquiry: str):
    return f"[Sales Service] Generated enterprise discount quote for: '{inquiry}'"

def handle_triage(inquiry: str):
    return f"[Triage Service] Routed for human representative follow-up: '{inquiry}'"

def main():
    # 3. Instantiate selector
    selector = AdaptiveToolSelector(
        decision_question=QUESTION,
        options_criteria=OPTIONS,
        decider_url="http://127.0.0.1:8000/v1/systemone",
        confidence_threshold=0.65,
    )

    # 4. Register tool bindings
    selector.register_tool("billing_inquiry", handle_billing)
    selector.register_tool("technical_support", handle_technical)
    selector.register_tool("sales_upgrade", handle_sales)
    selector.register_tool("general_triage", handle_triage)

    # 5. Test sample state
    state = {
        "user_request": "My card was charged twice for the monthly subscription!",
        "customer_tier": "Pro",
    }

    print("State Input:", state)
    decision = selector.select(state, mode="auto")
    print(f"Decider Selection: {decision.selected_option} (Source: {decision.source}, Latency: {decision.latency_ms}ms)")

    # 6. Dispatch tool
    output = selector.dispatch(decision, state["user_request"])
    print("Dispatched Tool Output:", output)

if __name__ == "__main__":
    main()
