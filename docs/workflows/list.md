---
layout: page
title: Index
permalink: /workflows/list
redirect_from:
  - /workflows/index-by-id
parent: Workflows
use_jquery: true
nav_order: 5
---

# Workflow Index
This page contains a list of all of the workflows published in the repository filterable by the products used. If you select multiple products, only workflows that include all selected products will be displayed.

<div id="sx-workflows">
	<div style="margin-bottom: 15px;">
		<select id="sx-workflow-products" name="products[]" multiple="multiple"></select>
	</div>
	<table>
		<thead>
			<tr>
				<th style="text-align: left">ID</th>
				<th style="text-align: left">Workflow Name</th>
				<th style="text-align: left">Products</th>
				<th style="text-align: left">
					<a href="{{ site.baseurl }}/workflows/response">Response</a>
				</th>
				<th style="text-align: left">
					<a href="{{ site.baseurl }}/remote">Remote</a>
				</th>
			</tr>
		</thead>
		<tbody id="sx-workflow-table">
			<tr id="sx-workflows-loading">
				<td colspan="5">Loading workflows...</td>
			</tr>
			<tr id="sx-workflows-none" style="display: none;">
				<td colspan="5">No workflows have that combination of products</td>
			</tr>
		</tbody>
	</table>
</div>

<script>
	$(document).ready(function()
	{
		$('#sx-workflow-products').select2({
			'placeholder': 'Select one or more products'
		});
		
		$('#sx-workflow-products').change(function(event)
		{
			var selectedProducts = [];
			
			$('#sx-workflow-products').select2('data').forEach(function(item)
			{
				if(!selectedProducts.includes(item.id)) selectedProducts.push(item.id);
			});
			
			if(selectedProducts.length == 0)
			{
				$('.sx-workflow-row').show();
				return false;
			}
			
			$('.sx-workflow-row').each(function()
			{
				var inCommon = $(this).data('products').filter(product => selectedProducts.includes(product));
				
				if(inCommon.length == selectedProducts.length)
				{
					$(this).show();
				}
				else
				{
					$(this).hide();
				}
			});
			
			if($('.sx-workflow-row:visible').length == 0)
			{
				$('#sx-workflows-none').show();
			}
			else
			{
				$('#sx-workflows-none').hide();
			}
			
			return false;
		});
		
		$.get('{{ site.baseurl }}/workflows/workflows.json', function(data)
		{
			var allProducts = [];
			
			data.forEach(function(workflow)
			{
				var products = [];
				
				workflow.products.forEach(function(product)
				{
					if(!allProducts.includes(product)) allProducts.push(product);
					
					products.push(product);
				});
				
				products.sort();
				
				var newRow = $('<tr id="w-' + workflow.id + '" class="sx-workflow-row">\
									<td>' + workflow.id + '</td>\
									<td>\
										<a href="{{ site.baseurl }}/workflows/' + workflow.id + '">' + workflow.title + '</a>\
									</td>\
									<td>' + products.join(', ') + '</td>\
									<td>\
										<i class="fas fa-' + (workflow.response_workflow ? 'check' : 'times') + '"></i>\
									</td>\
									<td>\
										<i class="fas fa-' + (workflow.remote_connector ? 'check' : 'times') + '"></i>\
									</td>\
								</tr>');
				
				$('#sx-workflow-table').append(newRow);
				
				$('#sx-workflow-table #w-' + workflow.id).data('products', products);
				$('#sx-workflow-table #w-' + workflow.id).data('response', workflow.response_workflow);
				$('#sx-workflow-table #w-' + workflow.id).data('remote', workflow.remote_connector);
			});
			
			allProducts.sort();
			
			allProducts.forEach(function(product)
			{
				$('#sx-workflow-products').append(new Option(product, product, false, false)).trigger('change');
			});
			
			$('#sx-workflows-loading').hide();
		}, 'json');
	});
</script>