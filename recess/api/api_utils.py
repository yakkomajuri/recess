from recess.settings import DEFAULT_PAGE_SIZE

def get_paginated_queryset(queryset, page):
    lower_bound = page * DEFAULT_PAGE_SIZE
    upper_bound = lower_bound + DEFAULT_PAGE_SIZE
    return queryset[lower_bound:upper_bound]
    
    
